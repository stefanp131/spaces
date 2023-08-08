using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Spaces.API.Controllers;

[Authorize]
public class TestController : BaseApiController
{
    [HttpGet]
    public ActionResult<string> Test()
    {
        return "Tested Succesfully";
    }
}