// On récupère le fichier
let inputFile = document.getElementById("inputFile");
inputFile.addEventListener("change", () => {
  inputFile.setAttribute("disabled", true);
  document.getElementById("success").style.visibility = "hidden";
  var reader = new FileReader();

  // liste des critères de blockage
  let keyWords = ["CLOTURE", "INEXISTANT", "RETRAITS A VUE SERVICE"];

  //let valides=[];
  let non_valides = []; //  la liste qui va contenir les lignes traitées

  reader.onload = () => {
    /* PROGRESS BAR */
    let bar = document.getElementById("theBar");
    bar.style.visibility = "visible";
    let width = 1;
    let id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
        document.getElementById("success").style.visibility = "visible";
      } else {
        width++;
        bar.style.width = width + "%";
        bar.innerHTML = width + "%";
      }
    }

    /* TRAITEMENT DES LIGNES */
    /*
         on met le contenu du fichier lu dans une liste, 
         comme chaque ligne contient un enregisrement complet
         on considère le sot de ligne comme séparateur
        */

    let lines = reader.result.split("\n");
    let total = 0;

    for (let i = 166; i < lines.length; i++) // lines.forEach((line)=>
    {
      let line = lines[i];
      // pour chaque ligne, on verifie si elle est marquée par un des critères de blocage
      if (keyWords.some((word) => line.includes(word))) {
        let newLine = line.replace("*", " ");
        newLine = newLine.replaceAll("*", ";");
        non_valides.push(newLine);
        total++;
      } else if (line.includes("0,00")) {
        // valides.push(line);
        total++;
      }
      // else{
      //     valides.push(line);
      // }
    }

    document.getElementById("total").innerText = total;
    document.getElementById("bloques").innerText = non_valides.length;
    // document.getElementById("valides").innerText=valides.length;
    document.getElementById("result").style.visibility = "visible";

    let non_valides_file = new Blob([non_valides.join("\n")], {
      type: "data:text/txt;charset=utf-8,",
    });
    let download_non_valides = document.createElement("a");
    download_non_valides.href = URL.createObjectURL(non_valides_file);
    download_non_valides.target = "_blank";
    download_non_valides.download = `non_valides_${new Date()
      .toJSON()
      .slice(0, 10)}.csv`;
    download_non_valides.click();
  };

  reader.readAsText(inputFile.files[0]);
});

let inputFinalEDI = document.getElementById("inputFinalEDI");
inputFinalEDI.addEventListener("change", () => {
  document.getElementById("result").style.visibility = "hidden";
  document.getElementById("success").style.visibility = "hidden";
  inputFinalEDI.setAttribute("disabled", true);
  var reader = new FileReader();

  reader.onload = () => {
    /* PROGRESS BAR */
    let bar = document.getElementById("theBar");
    bar.style.visibility = "visible";
    let width = 1;
    let id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
        document.getElementById("success").style.visibility = "visible";
      } else {
        width++;
        bar.style.width = width + "%";
        bar.innerHTML = width + "%";
      }
    }

    let lines = reader.result.split("\n");
    console.log(lines[0]);
    lines = lines.slice(1, lines.length);
    let total = lines.length;
    let current = 0;
    let part=0;
    

    while (current < total) {
      let size = Math.floor(Math.random() * (1000000 - 600000 + 1)) + 600000;
      part++;
      let batch = lines.slice(current, current + size);
      console.log(current);
      console.log(batch.length);
      let head = `*00000000000032444535${(
        "000000000000" +
        batch.length * 1300000
      ).slice(-13)}${("000000" + batch.length).slice(-7)}${(
        "0" +
        (new Date().getMonth() + 1)
      ).slice(-2)}${new Date().getFullYear()}              0`;
      batch.unshift(head);

      current += size;
      let valides_file = new Blob([batch.join("\n")], { type: "text/plain" });
      let download_valides = document.createElement("a");
      download_valides.href = URL.createObjectURL(valides_file);
      download_valides.download = `EDI_Partie_${part}_${new Date()
        .toJSON()
        .slice(0, 10)}.txt`;
      download_valides.click();
    }
  };

  reader.readAsText(inputFinalEDI.files[0]);
});
