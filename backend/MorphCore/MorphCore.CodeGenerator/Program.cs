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
//      SQLITE
// ----------------------------------------------------------------------------------------------------------------

// https://zetcode.com/csharp/sqlite/
// string connectionString = "Data Source=:memory:";
string connectionString = @"URI=file:northwind.sqlite3";

string version = SqliteUtils.GetVersion(connectionString) ?? String.Empty;
Console.WriteLine($"SQLite version: {version}");

var tables = SqliteUtils.GetTableNames(connectionString);
tables.ForEach(x => {
    Console.WriteLine($"{x.ToUpper()}");
    Console.WriteLine("---COLUMNS---");

    var columns = SqliteUtils.GetColumns(connectionString, $"{x}");
    columns.ForEach(c => {
        Console.WriteLine($"{c.Name.ToUpper()} {c.Type} {c.Defaults}");
    });
    Console.WriteLine("--------------------------------------------------");
});

// ----------------------------------------------------------------------------------------------------------------
//      SVG
// ----------------------------------------------------------------------------------------------------------------

int GetWidthToType(int charCount)
{
    return 34 + (charCount * 5);
}

int GetWidth(int charCount)
{
    return (GetWidthToType(charCount) + 60);
}

int GetHeight(int lineCount)
{
    return (lineCount * 17) + 16;
}

int x, y, width, height;
string text = string.Empty;

var builder = new System.Text.StringBuilder();

builder.AppendLine("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1000\" height=\"1000\">");

builder.AppendLine("<defs><style>@import url(\"https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i\");</style></defs>");
builder.AppendLine("<style><![CDATA[svg text{stroke:none}]]></style>");

x = 47; y = 97; width = 386; height = 143;
// Blue Frame
builder.AppendLine($"<rect x=\"{x}\" y=\"{y}\" width=\"{width}\" height=\"{height}\" style=\"fill:white;stroke:rgb(48,159,219);stroke-width:1;\" />");

// Title
x = 50; y = 100; width = 380; height = 16;
builder.AppendLine($"<rect x=\"{x}\" y=\"{y}\" width=\"{width}\" height=\"{height}\" style=\"fill:rgb(254,245,219);stroke:rgb(228,220,197);stroke-width:1;\"/>");
x = 215; y = 112; text = "EMPLOYEE";
builder.AppendLine($"<text x=\"{x}\" y=\"{y}\" font-family=\"Roboto\" font-size=\"7pt\" font-weight=\"bold\" text-anchor=\"middle\">{text}</text>"); 

x = 50; y = 116; width = 380; height = 17;
builder.AppendLine($"<rect x=\"{x}\" y=\"{y}\" width=\"{width}\" height=\"{height}\" style=\"fill:rgb(254,245,219);stroke:rgb(228,220,197);stroke-width:1;\"/>");
// Primary Key
x = 54; y = 128; text = "P";
builder.AppendLine($"<text x=\"{x}\" y=\"{y}\" font-family=\"Roboto\" font-size=\"7pt\" >{text}</text>"); 
// Foreign Key
x = 62; text = "P";
builder.AppendLine($"<text x=\"{x}\" y=\"{y}\" font-family=\"Roboto\" font-size=\"7pt\" >{text}</text>"); 
// Required
x = 70; text = "*";
builder.AppendLine($"<text x=\"{x}\" y=\"{y}\" fill=\"red\" font-family=\"Roboto\" font-size=\"7pt\" >{text}</text>"); 
// Name
x = 84; text = "EMPLOYEE";
builder.AppendLine($"<text x=\"{x}\" y=\"{y}\" font-family=\"Roboto\" font-size=\"7pt\" >{text}</text>"); 
// Type
x = 320; text = "NUMBER (6)";
builder.AppendLine($"<text x=\"{x}\" y=\"{y}\" font-family=\"Roboto\" font-size=\"7pt\" fill=\"rgb(152,147,160)\" >{text}</text>"); 

builder.AppendLine("</svg>");

// ---------------------------------------------------------------------------------------------------------------- 
//      END OF CONSOLE APPLICATION
// ----------------------------------------------------------------------------------------------------------------
// Console.ReadLine();