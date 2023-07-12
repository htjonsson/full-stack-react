using MongoDB.Driver;
using MongoDB.Bson;
using System.Text.RegularExpressions;

namespace MorphCore.CodeGenerator;

public static class MongoUtils 
{
    public static string ConvertToString(string containt)
    {
        containt = ConvertToString(containt, @"ObjectId\(""(\w)*""\)");
        containt = ConvertToString(containt, @"NumberInt\((\w|.)*\)");
        containt = ConvertToString(containt, @"ISODate\((\w|\W)*\)");

        // System.Console.WriteLine(containt);

        return containt;
    }

    private static string ConvertToString(string containt, string pattern)
    {
        foreach (Match match in Regex.Matches(containt, pattern, RegexOptions.Compiled | RegexOptions.IgnoreCase))
        {
            Console.WriteLine("   {0} at position {1}", match.Value, match.Index);
            containt = containt.Replace(match.Value, $"\"{match.Value.Replace($"\"", "'")}\"");
        }

        return containt;
    }

    public static void GetMetadata(ILogger logger, string connectionString, string databaseName)
    {
        var client = new MongoClient(connectionString);

        IMongoDatabase database = client.GetDatabase(databaseName);

        database.ListCollectionNames().ForEachAsync(name => {
            System.Console.WriteLine($"{name}");
        });

        // var docs = database.GetCollection<BsonDocument>("bladeMetadata");
        // System.Console.WriteLine($"{docs.CountDocuments(new BsonDocument())}");

        var collectionName = "formTemplates";

        var docs = database.GetCollection<BsonDocument>(collectionName).Find(p => true).ToList();
        docs.ConvertAll(BsonTypeMapper.MapToDotNetValue);

        var path = System.IO.Path.Combine(Environment.CurrentDirectory, "output");

        FileUtils.DeleteAll(logger, path, databaseName, collectionName);

        foreach(var bson in docs)
        {
            string json = bson.ToJson();
            string id = bson["_id"]?.ToString() ?? string.Empty;

            string containt = json.ToString();
            containt = MongoUtils.ConvertToString(containt); 


            if (string.IsNullOrWhiteSpace(id) == false)
            {
                FileUtils.WriteToFile(logger, path, databaseName, collectionName, id, "mongo.json", containt); 
            }   
        }
    }


}