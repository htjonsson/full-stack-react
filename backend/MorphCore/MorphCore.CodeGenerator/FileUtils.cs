namespace MorphCore.CodeGenerator;

public static class FileUtils 
{
    public static void WriteToFile(ILogger logger, string path, string databaseName, string collectionName, string name, string extension, string text)
    {
        var folder = System.IO.Path.Combine(path, databaseName, collectionName);
        
        if (CreateFolder(logger, folder)) 
        {
            System.IO.File.WriteAllText(System.IO.Path.Combine(path, databaseName, collectionName, name) + "." + extension, text);
        }  
    }

    public static bool CreateFile(ILogger logger, string filename)
    {
        try 
        {
            if (File.Exists(filename)) 
                return true;
            
            File.Create(filename);
            logger.LogInformation($"File created {filename}");
            
            return true;
        }
        catch(System.IO.DirectoryNotFoundException directoryNotFoundException)
        {
            logger.LogCritical(filename);
            logger.LogCritical(directoryNotFoundException.Message);
        }
        catch(System.Exception exception)
        {
            logger.LogCritical(filename);
            logger.LogCritical(exception.Message);
        }
        return false;
    }

    public static bool CreateFolder(ILogger logger, string foldername)
    {
        try
        {
            if (Directory.Exists(foldername))
                return true;

            Directory.CreateDirectory(foldername);
            logger.LogInformation($"Folder created {foldername}");
            
            return true;
        }
        catch (System.Exception exception)
        {
            logger.LogCritical(foldername);
            logger.LogCritical(exception.Message);
        }
        return false;
    }

    public static bool Exists(ILogger logger, string foldername)
    {
        if (Directory.Exists(foldername))
            return true;

        logger.LogCritical($"Folder not found {foldername}");
        return false;
    }

    public static void DeleteAll(ILogger logger, string path, string databaseName, string collectionName)
    {
        var folder = System.IO.Path.Combine(path, databaseName, collectionName);

        if (Directory.Exists(folder))
        {
            System.Console.WriteLine($"DeleteAll - {folder}");

            DeleteAll(logger, folder);
        }
    }

    public static void DeleteAll(ILogger logger, string folder)
    {
        System.IO.DirectoryInfo di = new DirectoryInfo(folder);

        foreach (FileInfo file in di.GetFiles())
        {
            System.Console.WriteLine($"Delete file - {file.Name}");

            file.Delete(); 
        }
        foreach (DirectoryInfo dir in di.GetDirectories())
        {
            dir.Delete(true); 
        }
    }
}