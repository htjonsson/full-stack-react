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
tables.ForEach(t => {
    Console.WriteLine($"{t.ToUpper()}");
    Console.WriteLine("---COLUMNS---");

    var table = new SvgTable()
    {
        Title = t
    };

    var columns = SqliteUtils.GetColumns(connectionString, $"{x}");
    columns.ForEach(c => {
        Console.WriteLine($"{c.Name.ToUpper()} {c.Type} {c.Defaults}");

        var column = new SvgColumn()
        {
            Name = c.Name,
            DataType = c.Type,
            IsPrimary = (c.Key > 0 ? true : false),
            isRequired = (c.IsNull ? false : true)
        };
        table.Columns.Add(column);
    });
    Console.WriteLine("--------------------------------------------------");
});

// ----------------------------------------------------------------------------------------------------------------
//      SVG
// ----------------------------------------------------------------------------------------------------------------

var builder = new ImageBuilder();

string path = "output.svg";

File.Delete(path);
File.WriteAllText(path, builder.ToString());

// ---------------------------------------------------------------------------------------------------------------- 
//      END OF CONSOLE APPLICATION
// ----------------------------------------------------------------------------------------------------------------
// Console.ReadLine();