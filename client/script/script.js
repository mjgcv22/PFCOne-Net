

let $addBtn = document.querySelector('#addBtn');
$addBtn.addEventListener('click', displayAdd);


function displayAdd(){
    let $addCustomer = document.querySelector('#toDisplay');
    let type = 'none';

    if($addCustomer.style.display == 'none'){
        $addCustomer.style.display = 'block';    
    }
}
