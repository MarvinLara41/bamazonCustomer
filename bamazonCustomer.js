var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require("cli-table2");

var connection= mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "*******",
    database: "bamazon_db",
    port:3306  

});


connection.connect();
display();


 function display() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log("============================");
      console.log("      Welcome To Bamazon    ");
      console.log("===========================");
      console.log(" Products List     ");
      var table = new Table({
        head: ["Product Id", "Product Description","Product Department", "Cost"],
        colWidths: [12, 20, 30, 8],
        colAligns: ["center", "center","center", "right"],
        style: {
          head: ["aqua"],
          compact: true
      
        }
      });
  
      for (var i = 0; i < res.length; i++) {
        table.push([res[i].id, res[i].product_name, res[i].department_name,res[i].price]);
      }
  
      console.log(table.toString());
      console.log("");
      runBamazon();
    });
  };



var runBamazon= function(){

inquirer
.prompt({
    
        name: "action",
        type: "rawlist",
        message: "What department would you like to look up?",
        choices: [
            "Clothing Products",
            "Auto Products",
            "Grocery Products",
            "Toy Products",
            
        ]
    
})
.then(function(answer){
switch(answer.action){
    case "Clothing Products":
        clothingProducts();
        break;

    case "Auto Products":
        autoProducts();
        break;

    case "Grocery Products":
        groceryProducts();
        break;

    case "Toy Products":
        toyProducts();
        break;

    
};



});
}


function toyProducts(){
    inquirer
    .prompt(
        {
        name: "toyProducts",
        type: "input",
        message: "What inventory of toy would you like to look up?", 
        
        }
    )
    .then(function(answer){
        var query = "SELECT product_name, price,stock_quanity FROM products WHERE department_name = 'Toys' "
        connection.query(query,function(err, res ){
            if (err) throw err; 
            for (var i =0; i < res.length; i++){
            console.log("Product :" + res[i].product_name + "|| Price: " + res[i].price + "|| Stock :" + res[i].stock_quanity);
            console.log("Here is our available stock");
            };

            inquirer
            .prompt({
                name:"Which products will you buy",
                type: "input",
                choices: [
                    "toy"
                    
                ]
            }).then (function(pick){
                var stockToy = pick.stockToy;
                if (stockToy > res[0].stock_quanity){
                    console.log ("We do not have enough items in stock"+ res[0].stock_quanity);
                } else{
                
                    console.log(res[0].product_name +"\n"+ "purchased");
                    console.log("Item" +"\n"+ "@ $" + res[0].price);
                    console.log("==================================");
                    console.log("+++++++THANK YOU FOR SHOPPING+++++++++");
                    console.log("===================================");


                    // var updateStock = res[0].stock_quanity -  stockToy;
                    // connection.query("UPDATE products SET stock_quanity"+ updateStock + "WHERE id = "+ res[0].id, function(err, newUp){
                    //     if (err) throw err;
                    //     console.log("Thank you for shopping");
                    //     console.log("order made, come again");
                    //     connection.end();
                    // })


                   runBamazon();
                }
                
                   
                
            })
            
            
        });
        
        
    });


};



function autoProducts(){
    inquirer
    .prompt(
        {
        name: "autoProducts",
        type: "input",
        message: "What inventory of auto products would you like to look up?", 
        
        }
    )
    .then(function(answer){
        var query = "SELECT product_name, price,stock_quanity FROM products WHERE department_name = 'Auto'"
        var select = answer.autoProducts;
        connection.query(query, select, function(err, res ){
            if (err) throw err; 

            for (var i =0; i < res.length; i++){
            console.log("Product :" + res[i].product_name + "|| Price: " + res[i].price + "|| Stock :" + res[i].stock_quanity);
            console.log("Here is our available stock");
            };

            inquirer
            .prompt({
                name:"Which products will you buy",
                type: "input",
                choices: [
                    "Car",
                    "Tires",
                    "Wipers"
                ]
            })
            .then (function(pick){
                var stockAuto = pick.stockAuto;
                if  (stockAuto > res[0].stock_quanity){
                    console.log ("We do not have enough items in stock"+ res[0].stock_quanity);
                } else{
                
                    console.log(res[0].product_name +"\n"+ "purchased");
                    console.log("Item" +"\n"+ "@ $" + res[0].price);
                    console.log("==================================");
                    console.log("+++++++THANK YOU FOR SHOPPING+++++++++");
                    console.log("===================================");


                    // var updateStock = res[0].stock_quanity -  stockAuto;
                    // connection.query("UPDATE products SET stock_quanity"+ updateStock + "WHERE id = "+ res[0].id, function(err, newUp){
                    //     if (err) throw err;
                    //     console.log("Thank you for shopping");
                    //     console.log("order made, come again");
                    //     connection.end();
                    // })

                    runBamazon();
                    
                }
                
                   
                
            })
            
            
        });
        
        
    });


};



function groceryProducts(){
    inquirer
    .prompt(
        {
        name: "groceryProducts",
        type: "input",
        message: "What inventory of grocery would you like to look up?", 
        
        }
    )
    .then(function(answer){
        var query = "SELECT product_name, price,stock_quanity FROM products WHERE department_name = 'Grocery' "
        connection.query(query,function(err, res ){
            if (err) throw err; 
            for (var i =0; i < res.length; i++){
            console.log("Product :" + res[i].product_name + "|| Price: " + res[i].price + "|| Stock :" + res[i].stock_quanity);
            console.log("Here is our available stock");
            };

            inquirer
            .prompt({
                name:"Which products will you buy",
                type: "input",
                choices: [
                    "Burger",
                    "Fries",
                    "CheeseSteak"
                ]
            }).then (function(pick){
                var stockGrocery = pick.stockGrocery;
                if (stockGrocery > res[0].stock_quanity){
                    console.log ("We do not have enough items in stock"+ res[0].stock_quanity);
                } else{
                
                    console.log(res[0].product_name +"\n"+ "purchased");
                    console.log("Item" +"\n"+ "@ $" + res[0].price);
                    console.log("==================================");
                    console.log("+++++++THANK YOU FOR SHOPPING+++++++++");
                    console.log("===================================");


                    // var updateStock = res[0].stock_quanity -  stockGrocery;
                    // connection.query("UPDATE products SET stock_quanity"+ updateStock + "WHERE id = "+ res[0].id, function(err, newUp){
                    //     if (err) throw err;
                    //     console.log("Thank you for shopping");
                    //     console.log("order made, come again");
                    //     connection.end();
                    // })


                    runBamazon();
                }
                
                   
                
            })
            
            
        });
        
        
    });


};

function clothingProducts(){
    inquirer
    .prompt(
        {
        name: "clothingProducts",
        type: "input",
        message: "What inventory of clothing would you like to look up?", 
        
        }
    )
    .then(function(answer){
        var query = "SELECT product_name, price,stock_quanity FROM products WHERE department_name = 'Clothing' "
        connection.query(query,function(err, res ){
            if (err) throw err; 
            for (var i =0; i < res.length; i++){
            console.log("Product :" + res[i].product_name + 
            "|| Price: " + res[i].price + 
            "|| Stock :" + res[i].stock_quanity);
            console.log("Here is our available stock");
            };

            inquirer
            .prompt({
                name:"Which products will you buy",
                type: "input",
                choices: [
                    "Shoe",
                    "pants",
                    "shirt"
                ]
            }).then (function(pick){
                var stockClothing = pick.stockClothing;
                if (stockClothing > res[0].stock_quanity){
                    console.log ("We do not have enough items in stock"+ res[0].stock_quanity);
                } else{ 
                
                    console.log(res[0].product_name +"\n"+ "purchased");
                    console.log("Item" +"\n"+ "@ $" + res[0].price);
                    console.log("==================================");
                    console.log("+++++++THANK YOU FOR SHOPPING+++++++++");
                    console.log("===================================");

                

                    // var updateStock = res[0].stock_quanity -  stockClothing;
                    // connection.query("UPDATE products SET stock_quanity"+ updateStock + "WHERE id = "+ res[0].stock_quanity, function(err, newUp){
                    //     if (err) throw err;
                    //     console.log("Thank you for shopping");
                    //     console.log("order made");
                    //     connection.end();


                    //     
                    // })

                    runBamazon();
                   
                }
                
                   
                
            })
            
            
        });
        
        
    });


};

