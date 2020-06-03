
// chamando a api e populando os selects
// function getObjectApi(select, url){

//     fetch(url)
//     .then( res => res.json() ) 
//     .then( objects => {

//         for( const object of objects){
//             select.innerHTML += `<option value='${object.id}'>${object.nome}</option>`;
//         }
       
//     } );
// }



// populando a select de estados
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");
    const urlStates = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

    fetch(urlStates)
    .then( res => res.json() ) 
    .then( objects => {

        for( const object of objects){
            ufSelect.innerHTML += `<option value='${object.id}'>${object.nome}</option>`;
        }
       
    } );
   
    
}

populateUFs();

// populando a select de cidades
function getCities(event) {
    const citiesSelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const urlCities = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citiesSelect.innerHTML = "<option value=''>Selecione a cidade</option>";
    citiesSelect.disabled = true;
    


    fetch(urlCities)
    .then( res => res.json() ) 
    .then( objects => {

        for( const object of objects){
            citiesSelect.innerHTML += `<option value='${object.nome}'>${object.nome}</option>`;
        }
       
    } );



    citiesSelect.disabled = false;


}

//select de estados
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities );

// itens de coleta
//pegar todos os li´s
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect){
    item.addEventListener("click", handleSeletedItem);
};

const colletedItems = document.querySelector("input[name=items]");
let selectedItems = [];
function handleSeletedItem(event){
    const itemLi = event.target;
    // adicionar ou remover uma classe com javaScript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id;

    //verificar se existem itens selecionados, se sim
    //pegar so itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId;//isso será true ou false
        return itemFound;
    });

    //se já estiver selecionado, tirar da selecao
    if(alreadySelected >= 0){
        //tirar da selecao 
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId; // false
            return itemIsDifferent;
        });
        selectedItems = filteredItems;
    } else{
        //se não estiver selecionado, adicionar á selecao
        selectedItems.push(itemId);
    }

    
    
    colletedItems.value = selectedItems;

};