namespace MorthCore.CodeGenerator;

public static class FileUtils 
{
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
}