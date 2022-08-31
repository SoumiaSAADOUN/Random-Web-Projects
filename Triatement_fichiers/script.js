// On récupère le fichier
let inputFile= document.getElementById('inputFile');
inputFile.addEventListener('change', ()=>{
    inputFile.setAttribute("disabled", true);
    var reader= new FileReader();

    // liste des critères de blockage 
    let keyWords=['CLOTURE', 'INEXISTANT', 'RETRAITS A VUE SERVICE'];

    // let valides=[];
    let non_valides=[]; //  la liste qui va contenir les lignes traitées

    reader.onload = ()=>{
        
        /* PROGRESS BAR */
        let bar = document.getElementById('theBar');
        bar.style.visibility='visible';
        let width= 1;
        let id = setInterval(frame,10)
        function frame(){
            if (width >= 100) {
                clearInterval(id);
                i = 0;
                document.getElementById('success').style.visibility='visible';
              } else {
                width++;
                bar.style.width = width + "%";
                bar.innerHTML = width + "%";
              }
        }


        /* TRAITEMENT DES LIGNES */
        /*
         on met le contenu du fichier lu dans une liste, 
         comme chaque ligne contient un enregidtrement complet
         on considère le sot de ligne comme séparateur
        */
       
        let lines = reader.result.split('\n'); 

        lines.forEach((line)=>{
            // pour chaque ligne, on verifie si elle est marquée par un des critères de blocage
            if (keyWords.some((word)=>line.includes(word))){
                let newLine = line.replace('*',' ');               
                newLine = newLine.replaceAll('*',';');             
                non_valides.push(newLine);
                
            }
            // else{
            //     valides.push(line);
            // }
        })
       
     
        let non_valides_file= new Blob([non_valides.join('\n')], {type: 'data:text/txt;charset=utf-8,'});
        let download_non_valides = document.createElement("a");
        download_non_valides.href=URL.createObjectURL(non_valides_file) ;
        download_non_valides.target='_blank';
         download_non_valides.download=`non_valides_${(new Date().toJSON().slice(0,10))}.csv`;
        download_non_valides.click();



        // let valides_file= new Blob([valides], {type:'text/plain'});
        // let download_valides = document.createElement("a");
        // download_valides.href=URL.createObjectURL(valides_file);
        // download_valides.download=`valides_${(new Date().toJSON().slice(0,10))}.txt`;
        // download_valides.click();
    };
    
    reader.readAsText(inputFile.files[0]);
   
})