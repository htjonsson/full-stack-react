namespace MorphCore.CodeGenerator;

public class SchemaBuilderNode 
{
    public JTokenType Type { get; set; } = JTokenType.None;
    public string Path { get; set; } = string.Empty;
    public string Parent { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    public SchemaBuilderNode(string path, JTokenType type)
    {
        this.Type = type;

        var parts = path.Replace("[]", "").Split(".");
        var size = parts.Count();

        if (size == 1)
        {
            this.Name = path.Replace("[]", "");;
            this.Path = "#";
            this.Path = string.Empty;
        }
        else 
        {
            this.Name = parts[size-1];
            this.Path = Path.Replace($".{Name}", "");
            
        }
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

    public void Compile()
    {
        foreach(var keyValue in this.Tokens)
        {
            // System.Console.WriteLine($"Key : {keyValue.Key}, Value : {keyValue.Value.ToString()}");

            if (string.IsNullOrWhiteSpace(keyValue.Key) == false)
            {
                 this.Nodes.Add(new SchemaBuilderNode(keyValue.Key, keyValue.Value));
            }    
        }

        foreach(var node in this.Nodes)
        {
            System.Console.WriteLine($"{node.Path} : {node.Name} : {node.Type.ToString()}");
        }

        JObject root = new JObject();

        var arrayNodes = this.Nodes.Where(x => x.Type.Equals(JTokenType.Array)).ToList();
        var objectNodes = this.Nodes.Where(x => x.Type.Equals(JTokenType.Object)).ToList();

        foreach(var node in this.Nodes.Where(w => w.Path.Equals(string.Empty)))
        {
            if (node.Type != JTokenType.Array)
                root.Add(new JProperty(node.Name, node.Type.ToString()));
        }

        System.Console.WriteLine(root.ToString());
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

    private void WriteLine(JProperty prop)
    {
        // System.Console.WriteLine($"Property Name => {prop.Name} {prop.Value.Type.ToString()}");
    }

    private void WriteLine(JObject obj)
    {
        /*
        if (obj.Children().Count() > 0)
        {
            System.Console.WriteLine($"Has Children [{obj.Children().Count()}]");
        }
        */
    }

    private void WriteLine(JToken token)
    {
        // System.Console.WriteLine($"Path =>  {token.Path} [{token.Type.ToString()}]");
        if (token.Type != JTokenType.Property)
        {
            // System.Console.WriteLine($"Path =>  {PurifyPath(token.Path)} [{token.Type.ToString()}]");

            string key = PurifyPath(token.Path);

            if (Tokens.ContainsKey(key) == false)
            {
                Tokens.Add(key, token.Type);
            }
        }
        

        return;

        /*
        if (token.HasValues) {
            System.Console.WriteLine("Has Values");
        }
        */

        if (token.Type == JTokenType.Object)
        {
            System.Console.WriteLine("Is Object");
        } 
        else if (token.Type == JTokenType.Array)
        {
            System.Console.WriteLine("Is Array");
        }
        else if (token.Type == JTokenType.String)
        {
            System.Console.WriteLine("Is String");
        }    
        else if (token.Type == JTokenType.Property)
        {
            System.Console.WriteLine("Is Property");
        }
        else if (token.Type == JTokenType.Integer)
        {
            System.Console.WriteLine("Is Property");
        }
        else if (token.Type == JTokenType.Boolean)
        {
            System.Console.WriteLine("Is Boolean");
        }
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