export const analysisService_getTreeData = () => {
    return  [  
        {
          "title": "Products",
          "key": "Products",
          "children": [
                {
                    "title": "ProductID",
                    "key": "Products.ProductID",
                    "value": "Products.ProductID",
                },
                {
                    "title": "ProductName",
                    "key": "Products.ProductName",
                    "value": "Products.ProductName",
                },
                {
                    "title": "SupplierID",
                    "key": "Products.SupplierID",
                    "value": "Products.SupplierID",
                },
                {
                    "title": "CategoryID",
                    "key": "Products.CategoryID",
                    "value": "Products.CategoryID",
                }, 
                {
                    "title": "QuantityPerUnit",
                    "key": "Products.QuantityPerUnit",
                    "value": "Products.QuantityPerUnit",
                }, 
                {
                    "title": "UnitPrice",
                    "key": "Products.UnitPrice",
                    "value": "Products.UnitPrice",
                },            
                {
                    "title": "UnitInStock",
                    "key": "Products.UnitInStock",
                    "value": "Products.UnitInStock",
                },
                {
                    "title": "UnitOnOrder",
                    "key": "Products.UnitOnOrder",
                    "value": "Products.UnitOnOrder",
                },
                {
                    "title": "ReorderLevel",
                    "key": "Products.ReorderLevel",
                    "value": "Products.ReorderLevel",
                },
                {
                    "title": "Discontinued",
                    "key": "Products.Discontinued",
                    "value": "Products.Discontinued",
                }
            ]
        },
        {
            "title": "Suppliers",
            "key": "Suppliers",
            "children": [
                {
                    "title": "ProductID",
                    "key": "Suppliers.SupplierID",
                    "value": "Suppliers.SupplierID",
                },
                {
                    "title": "CompanyName",
                    "key": "Suppliers.CompanyName",
                    "value": "Suppliers.CompanyName",
                },
                {
                    "title": "ContactName",
                    "key": "Suppliers.ContactName",
                    "value": "Suppliers.ContactName",
                },
                {
                    "title": "Contact Title",
                    "key": "Suppliers.ContactTitle",
                    "value": "Suppliers.ContactTitle",
                }, 
                {
                    "title": "Address",
                    "key": "Suppliers.Address",
                    "value": "Suppliers.Address",
                }, 
                {
                    "title": "City",
                    "key": "Suppliers.City",
                    "value": "Suppliers.City",
                },            
                {
                    "title": "Region",
                    "key": "Suppliers.Region",
                    "value": "Suppliers.Region",
                },
                {
                    "title": "PostalCode",
                    "key": "Suppliers.PostalCode",
                    "value": "Suppliers.PostalCode",
                },
                {
                    "title": "Country",
                    "key": "Suppliers.Country",
                    "value": "Suppliers.Country",
                },
                {
                    "title": "Phone",
                    "key": "Suppliers.Phone",
                    "value": "Suppliers.Phone",
                },
                {
                    "title": "Fax",
                    "key": "Suppliers.Fax",
                    "value": "Suppliers.Fax",
                },              
                {
                    "title": "HomePage",
                    "key": "Suppliers.HomePage",
                    "value": "Suppliers.HomePage",
                }
            ],
        },   
    ];    
}

export const analysisService_getTitle = () => {
    return {
        "title": "Generic Report",
        "subtitle": "Test data structure",
        "showFilters": true,
        "showOrdering": true
    };
}

export const analysisService_setOrderNumbers = (items) => {
    var num = 1;

    items.forEach(item => {
        item.number = num;
        num += 1;
    })

    return items;
}

export const analysisService_getItemDataByFilter = (keys) => {
    const items = new Array();
    const base = analysisService_getItemData();

    keys.forEach(key => {
        const found = base.find(x => x.key === key);

        if (found) {
            // clone object and safe in new array
            items.push({...found});
        }
    });

    return items;
}

export const analysisService_indexOf = (array, key) => {
    return array.findIndex((element, index) => {
        if (element.key === key) {
            return true;
        }
    });
}

export const analysisService_getItemData = () => {
    const items = new Array();

    const base = analysisService_getBaseItemData();
    var num = 1;

    base.forEach(baseItem => {
        const item = {
            title : baseItem.title,
            key : baseItem.key,
            type : baseItem.type.charAt(0).toUpperCase() + baseItem.type.slice(1),
            dataType : baseItem.dataType.charAt(0).toUpperCase() + baseItem.dataType.slice(1),
            order : "(default)",
            numberOfFilters : 0,
            number: num
        };
        num = num + 1;
        items.push(item);
    })

    return items;
}


export const analysisService_getBaseItemData = () => {
    return [
        {
            "title": "ProductID",
            "key": "Products.ProductID",
            "value": "Products.ProductID",
            "type": "identifier",
            "dataType": "string",
        },
        {
            "title": "ProductName",
            "key": "Products.ProductName",
            "value": "Products.ProductName",
            "dataType": "string",
            "type": "attribute",
        },
        {
            "title": "SupplierID",
            "key": "Products.SupplierID",
            "value": "Products.SupplierID",
            "dataType": "string",
            "type": "identifier",
        },
        {
            "title": "CategoryID",
            "key": "Products.CategoryID",
            "value": "Products.CategoryID",
            "dataType": "string",
            "type": "identifier",
        }, 
        {
            "title": "QuantityPerUnit",
            "key": "Products.QuantityPerUnit",
            "value": "Products.QuantityPerUnit",
            "dataType": "int",
            "type": "attribute",
        }, 
        {
            "title": "UnitPrice",
            "key": "Products.UnitPrice",
            "value": "Products.UnitPrice",
            "dataType": "float",
            "type": "attribute",
        },            
        {
            "title": "UnitInStock",
            "key": "Products.UnitInStock",
            "value": "Products.UnitInStock",
            "dataType": "int",
            "type": "attribute",
        },
        {
            "title": "UnitOnOrder",
            "key": "Products.UnitOnOrder",
            "value": "Products.UnitOnOrder",
            "dataType": "int",
            "type": "attribute",
        },
        {
            "title": "ReorderLevel",
            "key": "Products.ReorderLevel",
            "value": "Products.ReorderLevel",
            "dataType": "int",
            "type": "attribute",
        },
        {
            "title": "Discontinued",
            "key": "Products.Discontinued",
            "value": "Products.Discontinued",
            "dataType": "string",
            "type": "attribute",
        },
        {
            "title": "ProductID",
            "key": "Suppliers.SupplierID",
            "value": "Suppliers.SupplierID",
            "dataType": "string",
            "type": "identifier",
            "type": "attribute",
        },
        {
            "title": "CompanyName",
            "key": "Suppliers.CompanyName",
            "value": "Suppliers.CompanyName",
            "dataType": "string",
            "type": "attribute",
        },
        {
            "title": "ContactName",
            "key": "Suppliers.ContactName",
            "value": "Suppliers.ContactName",
            "dataType": "string",
            "type": "attribute",
        },
        {
            "title": "ContactTitle",
            "key": "Suppliers.ContactTitle",
            "value": "Suppliers.ContactTitle",
            "dataType": "string",
            "type": "attribute",
        }, 
        {
            "title": "Address",
            "key": "Suppliers.Address",
            "value": "Suppliers.Address",
            "dataType": "string",
            "type": "attribute",
        }, 
        {
            "title": "City",
            "key": "Suppliers.City",
            "value": "Suppliers.City",
            "dataType": "string",
            "type": "attribute",
        },            
        {
            "title": "Region",
            "key": "Suppliers.Region",
            "value": "Suppliers.Region",
            "dataType": "string",
            "type": "attribute",
        },
        {
            "title": "PostalCode",
            "key": "Suppliers.PostalCode",
            "value": "Suppliers.PostalCode",
            "dataType": "string",
            "type": "attribute",
        },
        {
            "title": "Country",
            "key": "Suppliers.Country",
            "value": "Suppliers.Country",
            "dataType": "string",
            "type": "attribute",
        },
        {
            "title": "Phone",
            "key": "Suppliers.Phone",
            "value": "Suppliers.Phone",
            "dataType": "string",
            "type": "attribute",
        },
        {
            "title": "Fax",
            "key": "Suppliers.Fax",
            "value": "Suppliers.Fax",
            "dataType": "string",
            "type": "attribute",
        },              
        {
            "title": "HomePage",
            "key": "Suppliers.HomePage",
            "value": "Suppliers.HomePage",
            "dataType": "string",
            "type": "attribute",
        } 	
    ];
} 