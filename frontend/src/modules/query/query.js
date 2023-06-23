import dayjs from "dayjs";
import { v4 as uuidv4 } from 'uuid';

const analysisService_setOrderNumbers = (items) => {
    var num = 1;

    items.forEach(item => {
        item.number = num;
        num += 1;
    })

    return items;
}

export const query_getItemDataByKeys = (dataModel, keys) => {
    const result = new Array();
    const base = getExternalItemData();

    keys.forEach(key => {
        const found = base.find(x => x.key === key);

        if (found) {
            // clone object and safe in new array
            result.push({...found});
        }
    });

    return result;
}

export const query_saveFilter = (model, filter) => {
    if (!model.filters) {
        model.filters = [];
        model.filters.push(filter);
    }
    else {
        const idx = model.filters.findIndex((element, index) => {
            if (element.id === filter.id) {
                return true;
            }
        });
        if (idx === -1) {
            model.filters.push(filter);
        } 
        else {
            model.filters[idx] = filter;
        }
    }
    return model;
}

const getIndexOf = (array, key) => {
    return array.findIndex((element, index) => {
        if (element.key === key) {
            return true;
        }
    });
}

const analysisService_getFilterByKey = (model, key) => {
    if (!model.filter) {
        return null;
    }

    const idx = getIndexOf(model.filter, key);
    if (idx != -1) {
        return model.filter[idx];
    }
    return null;
}

export const query_getItemByKey = (model, key) => {
    if (!model.items) {
        return null;
    }

    const idx = getIndexOf(model.items, key);
    if (idx != -1) {
        return model.items[idx];
    }
    return null;
}

const analysisService_getArrayKey = (items) => {
    const result = new Array();
    
    items.forEach(item => {
        result.push(item.key);
    });
}

export const query_fetchData = (id) => {
    return {
        title: getExternalTitle(),
        external: {
            items: getExternalItemData(),
            tree: {
                nodes: getExternalTreeData(),
                selected: [] 
            }
        },
        items: [] 
    };
} 

export const query_createFilterItem = (uuid, key, dataType) => {
    let type = "number";
    // Data type of filter
    if (dataType === "String") {
        type = "string";
    } 
    else if (dataType === "Date") {
        type = "date";
    }

    return {
        id: uuid,
        key: key,
        type: type,
        condition: "show",
        missing: "default",
        operation: "exactlyMatches",
        description: ""
    }
}

export const query_createFilterItemByData = (original, values) => {
    let _description = "";
    if (values.description) { _description = values.description };

    let _range = {};
    let _value = "";

    if (values.condition === "range") {
        if (values.type === "date") {
            _range = {
                from: dayjs(values.fromDate).format('YYYY-MM-DDT00:00:00Z[Z]'),
                to: dayjs(values.toDate).format('YYYY-MM-DDT00:00:00Z[Z]')
            }
        } 
        else {
            _range = {
                from: values.fromValue,
                to: values.toValue
            }
        }
    } else {
        if (values.type === "date") {
            _value = dayjs(values.dateValue).format('YYYY-MM-DDT00:00:00Z[Z]')
        }
        else {
            _value = values.textValue
        }
    }

    let _filter = {};

    if (values.condition === "range") {
        _filter = {
            id: original.id,
            key: original.key,
            type: values.type,
            condition: values.condition,
            operation: values.operation,
            missing: values.missing,
            description: _description,
            range: _range,
            expression: "here comes an expression example",
            enabled: true
        }
    }
    else {
        _filter = {
            id: original.id,
            key: original.key,
            type: values.type,
            condition: values.condition,
            operation: values.operation,
            missing: values.missing,
            description: _description,
            value: _value,
            expression: "here comes an expression example",
            enabled: true
        }          
    }

    return _filter;
}

export const query_removeItem = (array, key) => {
    const index = getIndexOf(array, key);

    if (index > -1) {       
        array.splice(index, 1); 
    }
}

const getExternalFilterData = () => {
    return [
        {
            "id": "",
            "key": "",
            "description": "",
        },
    ]
}

const getExternalItemData = () => {
    const items = new Array();

    const base = getExternalBaseItemData();
    var num = 1;

    base.forEach(baseItem => {
        const item = {
            title : baseItem.title,
            description : "",
            key : baseItem.key,
            type : baseItem.type.charAt(0).toUpperCase() + baseItem.type.slice(1),
            dataType : baseItem.dataType.charAt(0).toUpperCase() + baseItem.dataType.slice(1),
            orderBy : "(default)",
            numberOfFilters : 0,
            number: num
        };
        num = num + 1;
        items.push(item);
    })

    return items;
}

const getExternalBaseItemData = () => {
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
            "dataType": "date",
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
            "title": "SupplierID",
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

const getExternalTitle = () => {
    return {
        "title": "Generic Report",
        "subtitle": "Test data structure",
        "showFilters": true,
        "showOrdering": true
    };
}

const getExternalTreeData = () => {
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