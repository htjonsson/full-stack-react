namespace MorphCore.CodeGenerator;

public class Config
{
    // [JsonIgnoreSerialization]
    public string DefaultFileName => "Config.json";

    [JsonProperty("output")]
    public string OutputFolder { get; set; } = Path.Combine(System.Environment.CurrentDirectory, "output");

    [JsonProperty("template")]
    public string TemplateFolder { get; set; } = Path.Combine(System.Environment.CurrentDirectory, "template");

    public void Validate(ILogger logger)
    {
        bool result = true;

        result &= FileUtils.CreateFolder(logger, OutputFolder);
        result &= FileUtils.Exists(logger, TemplateFolder);

        if (result == false) 
            logger.LogCritical("Validation of Config.json failed");
    }
}