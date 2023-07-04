namespace MorphCore.CodeGenerator;

public static class SqliteUtils
{
    public static string? GetVersion(string connectionString)
    {
        System.Console.WriteLine(connectionString);

        using var connection = new SQLiteConnection(connectionString);
        connection.Open();

        using var command = new SQLiteCommand("SELECT SQLITE_VERSION()", connection);

        return command.ExecuteScalar()?.ToString();
    }

    public static List<string> GetTableNames(string connectionString)
    {
        using var connection = new SQLiteConnection(connectionString);
        connection.Open();

        using var command = new SQLiteCommand("SELECT [name] FROM [sqlite_master] WHERE [type]='table'", connection);
        using var dataReader = command.ExecuteReader();

        var result = new List<string>();
        while (dataReader.Read())
        {
            result.Add(dataReader.GetString(0));
        }
        return result;
    }

    public static List<SqliteColumnDef> GetColumns(string connectionString, string tableName)
    {
         using var connection = new SQLiteConnection(connectionString);
        connection.Open();

        using var command = new SQLiteCommand($"PRAGMA TABLE_INFO([{tableName}])", connection);
        using var dataReader = command.ExecuteReader();

        var result = new List<SqliteColumnDef>();
        while (dataReader.Read())
        {
            var cid = dataReader.GetInt32(0);
            var name = dataReader.GetString(1);
            var type = dataReader.GetString(2);
            var notNull = dataReader.GetInt32(3);
            var defaults = dataReader.GetValue(4);
            var pk = dataReader.GetInt32(5);
            var column = new SqliteColumnDef()
            {
                Id = cid,
                Name = name,
                Type = type,
                IsNull = (notNull == 1 ? true : false),
                Defaults = defaults.ToString() ?? string.Empty,
                Key = pk
            };
            result.Add(column);
        } 
        return result;      
    }

    public static List<SqliteTableDef> GetTables(string connectionString)
    {
        var result = new List<SqliteTableDef>();

        var tableNames = SqliteUtils.GetTableNames(connectionString);

        tableNames.ForEach(tableName => {
            var tableDef = new SqliteTableDef()
            {
                Name = tableName.ToUpper()
            };

            var columns = SqliteUtils.GetColumns(connectionString, $"{tableName}");

            if (columns != null)
            {
                tableDef.Columns.AddRange(columns);
            }

            result.Add(tableDef);
        });
        
        return result;
    }
}

public class SqliteTableDef
{
    public string Name { get; set; } = String.Empty;
    public List<SqliteColumnDef> Columns { get; set; } = new List<SqliteColumnDef>();
}

public class SqliteColumnDef 
{
    public int Id { get; set; }
    public string Name { get; set; } = String.Empty;
    public string Type { get; set; } = String.Empty;
    public bool IsNull { get; set; } = false;
    public string Defaults { get; set; } = String.Empty;
    public int Key { get; set; } 
}
