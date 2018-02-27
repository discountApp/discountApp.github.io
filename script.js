window.onload = function(){
    let productTable = document.getElementById("productsTable");
    let resultsTable = document.getElementById("resultsContainer");
    function createJson(){
            let data = [];
            let tableRows = productTable.getElementsByTagName('tr');
            for(let i=1;i<tableRows.length;i++){
                let idx = i;
                let cells = tableRows[idx].getElementsByTagName('td')
                let productName=tableRows[idx].getElementsByTagName('td')[0].getElementsByTagName('input')[0].value;
                let productPrice=tableRows[idx].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
                if(productName && productPrice){
                    data.push({
                        name: productName,
                        price: productPrice
                    });
                }
            }
        return data;
    }
   
    document.getElementById("addNewItemBtn").addEventListener("click", ()=>{
        if(productTable.rows.length<=5){
            let createdRow = productTable.insertRow(productTable.rows.length);
            let nameCell = createdRow.insertCell(0);
            let priceCell = createdRow.insertCell(1);
            nameCell.innerHTML = '<input type="text" name="name"></input>';
            priceCell.innerHTML = '<input type="number" min="1" name="price"></input>';
        }
    });

    function generateResultTable(data){
        resultsTable.innerHTML = '';
        let html = `
        <table align="center" id="productsTable" border="1">
        <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Price with discount</th>
        </tr>`
        data.forEach(element => {
            html += '<tr>'
            html += '<td>' + element.name + '</td>';
            html += '<td>' + element.price + '</td>';
            html += '<td>' + element.rabat + '</td>';
            html += '<td>' + element.priceWithRabat + '</td>';
            html += '</tr>'
        });
        html+='</table>';
        resultsTable.innerHTML = html;
    }

    function sendPostRequest(url, data){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.response);
                generateResultTable(JSON.parse(xhr.response));
            } else if (xhr.readyState === 4 && xhr.status !== 200) {
                window.location.href="http://rabatapp.herokuapp.com/error";
            };;

        };
        var data = JSON.stringify(data);
        xhr.send(data);
    }

    function getDiscount(){
        return document.getElementById('rabat').value;
    }
    
    document.getElementById("sendBtn").addEventListener("click", ()=>{
         const URL = 'http://rabatapp.herokuapp.com/products?rabat=' + getDiscount();
         let data = createJson();
         sendPostRequest(URL, data);
    });
}