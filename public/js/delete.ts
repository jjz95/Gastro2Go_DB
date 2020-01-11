import { json } from "express/lib/express"
//\d+$
function deleteSelectedProducts() {
    try {


        let productsToDelete = []
        var trs = document.querySelectorAll('#tbody-interests tr');

        for (let i = 0; i < trs.length; ++i) {
            let currRow = <HTMLTableRowElement>trs[i]
            let currCheckboxCell = currRow.cells[0]

            let currIdCell = currRow.cells[1]
            let currCheckBox = <HTMLInputElement>currCheckboxCell.firstElementChild

            productsToDelete.push({
                id: currIdCell.innerHTML,
                toDelete: currCheckBox.checked
            })

        }
        console.log('ooooooooooooooooooooooooooooo', productsToDelete)
        console.log('llllllllllllllllllllllllllll', `${window.location.href.replace(/\/\d+(\?)?$/, '')}/deleteproducts`)

        fetch(`${window.location.href.replace(/\/\d+(\?)?$/, '')}/deleteproducts`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({
                productsToDelete: productsToDelete
            })
        }).then(response => {
            // window.location.reload()
            console.log(response)
        }).catch(e =>
            console.log(e)
        )
    } catch (error) {
        console.log(error)
    }
}


// function test() {
// alert("1");
// console.log('1')
// }
// window.onload = test;