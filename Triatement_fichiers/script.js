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
    let allLines = [];

    for (
      let i = 166;
      i < lines.length;
      i++ // lines.forEach((line)=>
    ) {
      let line = lines[i];
      let newLine = line.replace("*", " ");
      newLine = newLine.replaceAll("*", ";");
     
      // pour chaque ligne, on verifie si elle est marquée par un des critères de blocage
      if (keyWords.some((word) => newLine.includes(word))) {
        // let newLine = line.replace("*", " ");
        // newLine = newLine.replaceAll("*", ";");
        non_valides.push(newLine);
        allLines.push(newLine);
        total++;
      } else if (line.includes("0,00")) {
        // valides.push(line);
        allLines.push(newLine);
        total++;
      }

      // else{
      //     valides.push(line);
      // }
    }

    console.log(allLines.length)

    document.getElementById("total").innerText = total;
    document.getElementById("bloques").innerText = non_valides.length;
    // document.getElementById("valides").innerText=valides.length;
    document.getElementById("result").style.visibility = "visible";
    document.getElementById("result").style.display = "flex";

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

    // convertir le fichier => CSV

    let all_file = new Blob([allLines.join("\n")], {
      type: "data:text/txt;charset=utf-8,",
    });
    let download_all_file = document.createElement("a");
    download_all_file.href = URL.createObjectURL(all_file);
    download_all_file.target = "_blank";
    download_all_file.download = `EDI_${new Date().toJSON().slice(0, 10)}.csv`;
    download_all_file.click();
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
    // let total = lines.length;
    // let current = 0;
    // let part = 0;

    let firstGroupList = [];
    let secondGroupList = [];
    let thirdGroupList = [];
    let firstGroup = [
      "00000001300000",
      "10000001300000",
      "20000001300000",
      "30000001300000",
    ];
    let secondGroup = ["40000001300000", "50000001300000", "60000001300000"];
    let thirdGroup = ["70000001300000", "80000001300000", "90000001300000"];

    /* LISTS */
    lines.forEach((line) => {
      if (firstGroup.some((word) => line.includes(word)))
        firstGroupList.push(line);
      if (secondGroup.some((word) => line.includes(word)))
        secondGroupList.push(line);
      if (thirdGroup.some((word) => line.includes(word)))
        thirdGroupList.push(line);
    });

    console.log(firstGroupList.length);
    console.log(secondGroupList.length);
    console.log(thirdGroupList.length);

    /* HEADERS */
    let head1 = `*00000000000032444535${(
      "000000000000" +
      firstGroupList.length * 1300000
    ).slice(-13)}${("000000" + firstGroupList.length).slice(-7)}${(
      "0" +
      (new Date().getMonth() + 1)
    ).slice(-2)}${new Date().getFullYear()}              0`;

    firstGroupList.unshift(head1);

    let head2 = `*00000000000032444535${(
      "000000000000" +
      secondGroupList.length * 1300000
    ).slice(-13)}${("000000" + secondGroupList.length).slice(-7)}${(
      "0" +
      (new Date().getMonth() + 1)
    ).slice(-2)}${new Date().getFullYear()}              0`;

    secondGroupList.unshift(head2);

    let head3 = `*00000000000032444535${(
      "000000000000" +
      thirdGroupList.length * 1300000
    ).slice(-13)}${("000000" + thirdGroupList.length).slice(-7)}${(
      "0" +
      (new Date().getMonth() + 1)
    ).slice(-2)}${new Date().getFullYear()}              0`;

    thirdGroupList.unshift(head3);

    /* DOWNLOAD FILES */
    let first_file = new Blob([firstGroupList.join("\n")], {
      type: "text/plain",
    });
    let download_first_file = document.createElement("a");
    download_first_file.href = URL.createObjectURL(first_file);
    download_first_file.download = `EDI_Partie_01_${new Date()
      .toJSON()
      .slice(0, 10)}.txt`;
    download_first_file.click();

    let second_file = new Blob([secondGroupList.join("\n")], {
      type: "text/plain",
    });
    let download_second_file = document.createElement("a");
    download_second_file.href = URL.createObjectURL(second_file);
    download_second_file.download = `EDI_Partie_02_${new Date()
      .toJSON()
      .slice(0, 10)}.txt`;
    download_second_file.click();

    let third_file = new Blob([thirdGroupList.join("\n")], {
      type: "text/plain",
    });
    let download_third_file = document.createElement("a");
    download_third_file.href = URL.createObjectURL(third_file);
    download_third_file.download = `EDI_Partie_03_${new Date()
      .toJSON()
      .slice(0, 10)}.txt`;
    download_third_file.click();

    document.getElementById("first").innerText = firstGroupList.length;
    document.getElementById("second").innerText = secondGroupList.length;
    document.getElementById("third").innerText = thirdGroupList.length;
    // document.getElementById("valides").innerText=valides.length;
    document.getElementById("result_division").style.display = "flex";
    document.getElementById("result_division").style.visibility = "visible";

    // while (current < total) {
    //   let size = Math.floor(Math.random() * (1000000 - 600000 + 1)) + 600000;
    //   part++;
    //   let batch = lines.slice(current, current + size);
    //   console.log(current);
    //   console.log(batch.length);
    //   let head = `*00000000000032444535${(
    //     "000000000000" +
    //     batch.length * 1300000
    //   ).slice(-13)}${("000000" + batch.length).slice(-7)}${(
    //     "0" +
    //     (new Date().getMonth() + 1)
    //   ).slice(-2)}${new Date().getFullYear()}              0`;
    //   batch.unshift(head);

    //   current += size;
    //   let valides_file = new Blob([batch.join("\n")], { type: "text/plain" });
    //   let download_valides = document.createElement("a");
    //   download_valides.href = URL.createObjectURL(valides_file);
    //   download_valides.download = `EDI_Partie_${part}_${new Date()
    //     .toJSON()
    //     .slice(0, 10)}.txt`;
    //   download_valides.click();
    // }
  };

  reader.readAsText(inputFinalEDI.files[0]);
});
