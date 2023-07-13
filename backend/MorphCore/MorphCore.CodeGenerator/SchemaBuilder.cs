namespace MorphCore.CodeGenerator;

public class SchemaCompilerNode
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Path { get; set; } = string.Empty;    
}

public class QueryModel 
{
    public List<QuerySubject> Subjects { get; set; }  = new List<QuerySubject>();
    public List<Relationship> Relations { get; set; } = new List<Relationship>();
}

public class QuerySubject
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Key { get; set; } = string.Empty;
    public List<QueryItem> Items { get; set; } = new List<QueryItem>();
}

public class QueryItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
}

public class Relationship
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Key { get; set; } = string.Empty;   
    public bool Mutlitple { get; set; } = false; 
    public string Type { get; set; } = string.Empty;  
}

public class SchemaBuilderNode 
{
    public string Type { get; set; } = string.Empty;
    public string Path { get; set; } = string.Empty;
    public string Parent { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Unique { get; set; } = string.Empty;
    public int Indent { get; set; } = 0;

    public SchemaBuilderNode()
    {}

    public SchemaBuilderNode(string path, JTokenType type)
    {
        this.Unique = path;
        this.Type = type.ToString().ToLower();

        var parts = path.Replace("[]", "").Split(".");
        var size = parts.Count();
        path = path.Replace("[]", "");

        if (size == 1)
        {
            this.Name = path;
            this.Path = string.Empty;
        }
        else 
        {
            this.Name = parts[size-1];
            this.Path = path.Replace($".{Name}", ""); 
        }
        this.Parent = GetParent(this.Path);
        this.Indent = size;
    }

    private string GetParent(string path)
    {
        int idx = this.Path.LastIndexOf(".");
        if (idx > 0)
        {
            return Path.Substring(0, idx);
        }
        return string.Empty;
    }
}

public class SchemaCompiler
{
    public ILogger logger { get; set; }

    public SchemaCompiler(ILogger logger)
    {
        this.logger = logger;
    }

    public List<SchemaCompilerNode> ArrayList { get; set; } = new List<SchemaCompilerNode>();
    public List<SchemaCompilerNode> ObjectList { get; set; } = new List<SchemaCompilerNode>();
    public List<SchemaCompilerNode> PropertyList { get; set; } = new List<SchemaCompilerNode>();
    public List<SchemaBuilderNode> Nodes { get; set; } = new List<SchemaBuilderNode>();

    public SchemaBuilderNode GetByPathAndName(string path, string name)
    {
        return Nodes.Where(x => x.Path == path && x.Name == name && x.Type != "array").FirstOrDefault();
    }

    public string NameFromKey(string key)
    {
        var split = key.Split(".");

        for(int i = 0; i < split.Count(); i++)
            split[i] = split[i].ToLower();

        return string.Join("_", split);
    }

    public void Compile(Dictionary<string, JTokenType> tokens)
    {
        var model = new QueryModel();

        foreach(var keyValue in tokens)
        {
            if (string.IsNullOrWhiteSpace(keyValue.Key) == false)
            {
                System.Console.WriteLine(keyValue.Key);
                 this.Nodes.Add(new SchemaBuilderNode(keyValue.Key, keyValue.Value));
            }    
        }

        System.Console.WriteLine($"------------------------------------> Nodes");

        foreach(var node in this.Nodes)
        {
            System.Console.WriteLine($"{node.Path} : {node.Parent} : {node.Name} : {node.Indent} : {node.Type.ToString()}");
        }

        var arrayList = this.Nodes.Where(x => x.Type.Equals(JTokenType.Array.ToString().ToLower())).ToList();
        arrayList.ForEach(x => 
        {
            var node = GetByPathAndName(x.Path, x.Name);
            if (node != null)
            {
                ArrayList.Add(new SchemaCompilerNode() {
                    Path = node.Path,
                    Name = node.Name,
                    Type = node.Type + "Array"
                });
            }
            else
            {
                ArrayList.Add(new SchemaCompilerNode() {
                    Path = x.Path,
                    Name = x.Name,
                    Type = x.Type
                });                
            }   
        });

        System.Console.WriteLine($"------------------------------------> Object/Array");

        ArrayList.ForEach(x => 
        {
            System.Console.WriteLine($"{x.Path} : {x.Name} : {x.Type}");

            var relation = new Relationship()
            {
                Key = x.Path,
                Name = x.Name,
                Type = x.Type,
                Mutlitple = false
            };
            model.Relations.Add(relation);
        });

        var objectList = this.Nodes.Where(x => x.Type.Equals(JTokenType.Object.ToString().ToLower())).ToList();
        objectList.ForEach(x => 
        {
            if (arrayList.Where(w => w.Path == x.Path && w.Name == x.Name).Count() == 0)
            {
                ObjectList.Add(new SchemaCompilerNode() {
                    Path = x.Path,
                    Name = x.Name,
                    Type = x.Type
                });      
            }
        });

        System.Console.WriteLine($"------------------------------------> Object");

        ObjectList.ForEach(x => 
        {
            System.Console.WriteLine($"{x.Path} : {x.Name} : {x.Type}");

            var relation = new Relationship()
            {
                Key = x.Path,
                Name = x.Name,
                Type = x.Type,
                Mutlitple = false
            };
            model.Relations.Add(relation);
        });

        var propertyList = this.Nodes
                            .Where(w => w.Type != "object")
                            .Where(w => w.Type != "array")
                            .ToList();

        var querySubjects = new Dictionary<string, QuerySubject>();     
        propertyList.ForEach(x => 
        {
            var qs = new QuerySubject();
            if (querySubjects.ContainsKey(x.Path)) 
            {
                qs = querySubjects[x.Path];
            }
            else 
            {
                qs.Name = NameFromKey(x.Path);
                qs.Key = x.Path;
                querySubjects.Add(x.Path, qs);
            }

            var qi = new QueryItem() {
                Name = x.Name,
                Type = x.Type
            };
            qs.Items.Add(qi);
        });                  

        foreach(var keyValue in querySubjects)
            model.Subjects.Add(keyValue.Value);

        System.Console.WriteLine($"------------------------------------> Query Subject");
        
        model.Subjects.ForEach(x => 
        {
            System.Console.WriteLine($"{x.Name} : {x.Items.Count()}");
        });

        string json = JsonConvert.SerializeObject(model);

        System.Console.WriteLine(json);
    }
}

public class SchemaBuilder
{
    public ILogger logger { get; set; }
    public Dictionary<string, JTokenType> Tokens { get; set; } = new Dictionary<string, JTokenType>();
    public List<SchemaBuilderNode> Nodes { get; set; } = new List<SchemaBuilderNode>();

    public SchemaBuilder(ILogger logger)
    {
        this.logger = logger;
    }

    public void Parse(string containt)
    {
        Parse(JToken.Parse(containt));
    }

    private void Parse(JToken token)
    {
        WriteLine(token);

        if (token.Type == JTokenType.Object)
        {
            Parse((JObject)token);
        } 
        else if (token.Type == JTokenType.Array)
        {
            Parse((JArray)token);
        }
        else if (token.Type == JTokenType.Property)
        {
            Parse((JProperty)token);
        }
    }

    private void Parse(JArray array)
    {
        WriteLine(array);

        foreach(var child in array.Children())
        {
            Parse(child);
        }    
    }

    private void Parse(JObject obj)
    {
        WriteLine(obj);

        foreach(var child in obj.Children())
        {
            Parse(child);
        }
    }

    private void Parse(IEnumerable<JProperty> props)
    {
        foreach(var prop in props)
        {
            Parse(prop);
        }
    }

    private void Parse(JProperty prop)
    {
        WriteLine(prop);

        Parse(prop.Value);
    }

    private void WriteLine(JToken token)
    {
        if (token.Type != JTokenType.Property)
        {
            string key = PurifyPath(token.Path);

            if (Tokens.ContainsKey(key) == false)
            {
                Tokens.Add(key, token.Type);
            }
        }
        

        return;
    }

    private string PurifyPath(string path)
    {
        for(int i=0; i < 30; i++)
        {
            path = path.Replace($"[{i}]", "[]");
        }

        return path;
    }
}