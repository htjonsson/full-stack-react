using System.Net.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MorphCore.WebApi.Controllers
{
    [ApiController]
    [Route("api/v1")]
    public class AnalysisController : ControllerBase
    {
        private readonly ILogger<AnalysisController> _logger;

        public AnalysisController(ILogger<AnalysisController> logger)
        {
            _logger = logger;
        }       

        [HttpGet]
        [Route("test")]
        public async Task<IActionResult> Test()
        {
            // https://zetcode.com/csharp/httpclient/
            using var client = new HttpClient();
            

            var res = await client.GetAsync("http://localhost:3000/querySubjects");
            var content = await res.Content.ReadAsStringAsync();

            _logger.LogInformation(content);
            return Ok(content);
        }
    }
}