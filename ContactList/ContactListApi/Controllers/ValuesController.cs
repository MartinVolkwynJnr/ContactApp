using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ContactListApi.Services;
using ContactListApi.Models;

namespace ContactListApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly ContactService _contactService;

        public ValuesController(ContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public ActionResult<List<ContactInfo>> Get() =>
                    _contactService.Get();

        [HttpGet("{id:length(24)}", Name = "GetContactInfo")]
        public ActionResult<ContactInfo> Get(string id)
        {
            var ContactInfo = _contactService.Get(id);

            if (ContactInfo == null)
            {
                return NotFound();
            }

            return ContactInfo;
        }

        [HttpPost]
        public ActionResult<ContactInfo> Create(ContactInfo ContactInfo)
        {
            _contactService.Create(ContactInfo);

            return CreatedAtRoute("GetContactInfo", new { id = ContactInfo.Id.ToString() }, ContactInfo);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, ContactInfo ContactInfoIn)
        {
            var ContactInfo = _contactService.Get(id);

            if (ContactInfo == null)
            {
                return NotFound();
            }

            _contactService.Update(id, ContactInfoIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var ContactInfo = _contactService.Get(id);

            if (ContactInfo == null)
            {
                return NotFound();
            }

            _contactService.Remove(ContactInfo.Id);

            return NoContent();
        }


    }
}
