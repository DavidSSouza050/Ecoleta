
// chamando a api e populando os selects
function getObjectApi(select, url){

    fetch(url)
    .then( res => res.json() ) 
    .then( objects => {

        for( const object of objects){
            select.innerHTML += `<option value="${object.id}">${object.nome}</option>`;
        }
       
    } );
}

// populando a select de estados
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");
    const urlStates = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

    getObjectApi(ufSelect, urlStates);
   
    
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

    
    getObjectApi(citiesSelect, urlCities);
   
    citiesSelect.disabled = false;

}




//select de estados
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities );