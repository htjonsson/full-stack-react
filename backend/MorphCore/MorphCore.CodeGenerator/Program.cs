using MorphCore.CodeGenerator;

// https://github.com/anthonyreilly/NetCoreForce/blob/main/src/NetCoreForce.ModelGenerator/GenConfig.cs

// ----------------------------------------------------------------------------------------------------------------
//      SETUP LOGGING 
//      https://thecodeblogger.com/2021/05/11/how-to-enable-logging-in-net-console-applications/
// ----------------------------------------------------------------------------------------------------------------
using var loggerFactory = LoggerFactory.Create(builder =>
{
    builder
        .AddFilter("Microsoft", LogLevel.Warning)
        .AddFilter("System", LogLevel.Warning)
        .AddFilter("NonHostConsoleApp.Program", LogLevel.Debug)
        .AddConsole();
});
ILogger logger = loggerFactory.CreateLogger<Program>();

// ----------------------------------------------------------------------------------------------------------------
//      TEST LOGGING 
// ----------------------------------------------------------------------------------------------------------------

// logger.LogInformation("Info Log");
// logger.LogWarning("Warning Log");
// logger.LogError("Error Log");
// logger.LogCritical("Critical Log");

// ----------------------------------------------------------------------------------------------------------------
//      CONFIGURATION
// ----------------------------------------------------------------------------------------------------------------
var config = new MorphCore.CodeGenerator.Config();

config.Validate(logger);

// ----------------------------------------------------------------------------------------------------------------
//      SCHEMA BUILDER
// ----------------------------------------------------------------------------------------------------------------

try
{
    var containt = System.IO.File.ReadAllText("mongo.test.json");  

    var schemaBuilder = new SchemaBuilder(logger);
    schemaBuilder.Parse(containt);

    var schemaCompiler = new SchemaCompiler(logger);
    schemaCompiler.Compile(schemaBuilder.Tokens);
}
catch (System.Exception exp)
{
    System.Console.WriteLine(exp.Message);
}

return;

// ----------------------------------------------------------------------------------------------------------------
//      MONGODB
// ----------------------------------------------------------------------------------------------------------------

var mongoConnectionString = "mongodb://localhost:27017/?readPreference=primary";
var databaseName = "unite_spikeliving";

try
{
  MongoUtils.GetMetadata(logger, mongoConnectionString, databaseName);  
}
catch (System.Exception exp)
{
    System.Console.WriteLine(exp.Message);
}

return;

// ----------------------------------------------------------------------------------------------------------------
//      SQLITE
// ----------------------------------------------------------------------------------------------------------------

// https://zetcode.com/csharp/sqlite/
// string connectionString = "Data Source=:memory:";
string connectionString = @"URI=file:northwind.sqlite3";

string version = SqliteUtils.GetVersion(connectionString) ?? String.Empty;
Console.WriteLine($"SQLite version: {version}");

var tables = SqliteUtils.GetTables(connectionString);

if (false) 
{
    tables.ForEach(t => {
        Console.WriteLine($"{t.Name.ToUpper()}");
        Console.WriteLine("---COLUMNS---");  

        t.Columns.ForEach(c => {
            Console.WriteLine($"{c.Name.ToUpper()} {c.Type} {c.Defaults}");
        });
        Console.WriteLine("--------------------------------------------------");
    });
}

// ----------------------------------------------------------------------------------------------------------------
//      NODES
// ----------------------------------------------------------------------------------------------------------------

var nodes = new List<ModelNode>();

if (true) 
{
    tables.ForEach(t => {
        var node = new ModelNode();

        node.AddTitle(t.Name.ToUpper());
        node.AddSeparator();
        
        t.Columns.ForEach(c => {
            var name = c.Name.ToUpper();
            var extent = c.Type;
            var isPrimary = (c.Key > 0 ? true : false);
            var isForeign = false;
            var isRequired = (c.IsNull == true ? false : true);

            node.AddText(name, extent, isPrimary, isForeign, isRequired);            
        });

        if(t.Columns.Count > 0)
        {
            node.AddHorizontalLine();
        }

        nodes.Add(node);
    });
}

// ----------------------------------------------------------------------------------------------------------------
//      LAYOUT CALCULATIONS
// ----------------------------------------------------------------------------------------------------------------

// Set default width and height
nodes.ForEach(n => {
    n.SetDefaults();
});

int x = 80;
int y = 10;
nodes.ForEach(n => {
    var rect = n.SetLocation(x, y);
    
    y = rect.Y + rect.Height + 20 + 2;
});

// ----------------------------------------------------------------------------------------------------------------
//      DRAWING SVG
// ----------------------------------------------------------------------------------------------------------------

var builder = new ImageBuilder();

string path = "output.svg";

File.Delete(path);
File.WriteAllText(path, builder.ToString(600, 3000, nodes));

// ---------------------------------------------------------------------------------------------------------------- 
//      END OF CONSOLE APPLICATION
// ----------------------------------------------------------------------------------------------------------------
// Console.ReadLine();

public class Location 
{
    public int X { get; set; }
    public int Y { get; set; }
}

public class Rect
{
    public int X { get; set; }
    public int Y { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }

    public Rect()
    {
        this.X = this.Y = this.Width = this.Height = 0;
    }

    public Rect(int x, int y, int width, int height)
    {
        this.X = x;
        this.Y = y;
        this.Width = width;
        this.Height = height;
    }

    public Rect Inflate(int factor)
    {
        var r = new Rect();

        r.X = this.X - factor;
        r.Y = this.Y - factor;
        r.Width = this.Width + factor*2;
        r.Height = this.Height + factor*2;

        return r;
    }
}

public class ModelNode 
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = String.Empty;
    public Rect Rect { get; set; } = new Rect();
    public List<ModelItem> Items { get; set; } = new List<ModelItem>();

    public void SetDefaults()
    {
      Items.ForEach(i => {
        i.Rect.Width = 380;

        if (i.Type == ModelItemType.Text) 
        {
            i.Rect.Height = 16;
        }
        else if (i.Type == ModelItemType.Separator) 
        {
            i.Rect.Height = 5;
        }
        else if (i.Type == ModelItemType.HorizontalLine)
        {
            i.Rect.Height = 1;
        }
        else if (i.Type == ModelItemType.Title)
        {
            i.Rect.Height = 20;
        }
    });      
    }

    public Rect SetLocation(int x, int y)
    {
        this.Rect.X = x;
        this.Rect.Y = y;
        this.Rect.Height = GetHeight();
        this.Rect.Width = GetWidth();

        this.Items.ForEach(item => {
            item.Rect.X = x;
            item.Rect.Y = y;

            y += item.Rect.Height;
        });

        return this.Rect;
    }

    public int GetHeight()
    {
        int height = 0;

        Items.ForEach(x => {
            height += x.Rect.Height;
        });
        return height;
    }

    public int GetWidth()
    {
        int width = Int32.MinValue;

        Items.ForEach(x => {
            width = Int32.Max(width, x.Rect.Width);
        });
        return width;
    }

    public void AddSeparator()
    {
        this.Items.Add(new ModelItem() {
            Type = ModelItemType.Separator
        });
    }

    public void AddHorizontalLine()
    {
        this.Items.Add(new ModelItem() {
            Type = ModelItemType.HorizontalLine
        });
    }

    public void AddText(string text, string extent, bool isPrimary, bool isForeign, bool isRequired)
    {
        this.Items.Add(new ModelItem() {
            Type = ModelItemType.Text,
            Text = text,
            Extent = extent,
            IsPrimary = isPrimary,
            IsForeign = isForeign,
            IsRequired = isRequired
        });
    }

    public void AddTitle(string text)
    {
          this.Items.Add(new ModelItem() {
            Type = ModelItemType.Title,
            Text = text
        });      
    }
}

public enum ModelItemType 
{
    None,
    Text,
    Title,
    Separator,
    HorizontalLine
}

public class ModelItem 
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Rect Rect { get; set; } = new Rect();

    public Location GetRightAncor()
    {
        return new Location() {
            X = Rect.X + Rect.Width,
            Y = Rect.Y + (Rect.Height / 2)
        };
    }

    public Location GetLeftAncor()
    {
        return new Location() {
            X = Rect.X,
            Y = Rect.Y + (Rect.Height / 2)
        };
    }    

    public ModelItemType Type { get; set; } = ModelItemType.None;

    public bool IsRequired { get; set; } = false;
    public bool IsPrimary { get; set; } = false;
    public bool IsForeign { get; set; } = false;
    public string Text { get; set; } = String.Empty;
    public string Extent { get; set; } = String.Empty;
}