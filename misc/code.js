{
	"item" [
		{
			"id": "",
			""title"": "",
			"type": "",
			"dataType": "",
			"style": "default"
		}
	],
	"title": {
		""title"": "",
		"sub"title"": "",
		"showFilters": true,
		"showOrdering": true
	},	
	"filter" {
		"id": "",
		"type": "text|range",
		"filterType": "contains|notContains",
		"range": {
			"from": "",
			"minimum": true,
			"to": "",
			"maximum": true    
		},
		"text": {
			""value"": "",
			"condition": "match|contains|startsWith|endsWith",
			"caseSensitive": true
		},
		"missing"value"s": "default|hide|show"
	},
	"sort": {
		"id": "",
		"orderBy": "default|asc|dec"
	}
}



treeData = [  
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

title = {
	"title": "Generic Report",
	"subtitle": "Test data structure",
	"showFilters": true,
	"showOrdering": true	
};

itemData = [
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
]

