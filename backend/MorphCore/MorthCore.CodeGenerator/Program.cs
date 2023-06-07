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
var config = new MorthCore.CodeGenerator.Config();

config.Validate(logger);


// ----------------------------------------------------------------------------------------------------------------
//      END OF CONSOLE APPLICATION
// ----------------------------------------------------------------------------------------------------------------
Console.ReadLine();