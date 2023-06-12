class QueryViewModel {
  const allItems = [];
  const items = [];
  const treeData = {};

  constructor() {}
}

"item" [
  "id": "",
  "dataType": "",
]
"filter" {
  "id": "",
  "type": "text"|"range",
  "filterType": "show"|"hide",
  "range": {
    "from": "",
    "fromMinimum": true,
    "to": "",
    "toMaximum": true,    
  },
  "text": {
    "value": "",
    "condition": "match"|"contains"|"startsWith"|"endsWith",
    "caseSensitive": boolean
  }
  "missingValues": "default"|"hide"|"show"
}
"sort" {
  "id": "",
  "orderBy": "default"|"asc"|"dec"
};
"title" {
  "title": "",
  "subtitle" = "",
  "showFilters" = true,
  "showOrdering" = true
};