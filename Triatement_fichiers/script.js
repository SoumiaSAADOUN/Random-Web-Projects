let inputFile= document.getElementById('inputFile');
inputFile.addEventListener('change', ()=>{
    var reader= new FileReader();
    
    // let valides=[];
    let non_valides=[];
    reader.onload = ()=>{
        let lines = reader.result.split('\n');
        lines.forEach((line)=>{
            if (line.includes('CLOTURE', 'INEXISTANT', 'EN INSTANCE DE CLOTURE')){
                non_valides.push(line);
            }
            // else{
            //     valides.push(line);
            // }
        })
       
     
        let non_valides_file= new Blob([non_valides.join('\n')], {type: 'data:text/txt;charset=utf-8,'});
        let download_non_valides = document.createElement("a");
        download_non_valides.href=URL.createObjectURL(non_valides_file) ;
        download_non_valides.target='_blank';
        download_non_valides.download=`non_valides_${(new Date().toJSON().slice(0,10))}.txt`;
        download_non_valides.click();



        // let valides_file= new Blob([valides], {type:'text/plain'});
        // let download_valides = document.createElement("a");
        // download_valides.href=URL.createObjectURL(valides_file);
        // download_valides.download=`valides_${(new Date().toJSON().slice(0,10))}.txt`;
        // download_valides.click();
    };
    
    reader.readAsText(inputFile.files[0]);
   
})