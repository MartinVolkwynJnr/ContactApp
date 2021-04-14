using ContactListApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System;

namespace ContactListApi.Services
{
    public class ContactService
    {
        private readonly IMongoCollection<ContactInfo> _contacts;

        public ContactService(IContactInfoDataBaseSettings settings)
        {
            Console.WriteLine(settings.ConnectionString);
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _contacts = database.GetCollection<ContactInfo>(settings.ContactInfoCollectionName);
        }

        public List<ContactInfo> Get() =>
            _contacts.Find(contact => true).ToList();

        public ContactInfo Get(string id) =>
            _contacts.Find<ContactInfo>(contact => contact.Id == id).FirstOrDefault();

        public ContactInfo Create(ContactInfo contact)
        {
            _contacts.InsertOne(contact);
            return contact;
        }

        public void Update(string id, ContactInfo contactIn) =>
            _contacts.ReplaceOne(contact => contact.Id == id, contactIn);

        public void Remove(ContactInfo contactIn) =>
            _contacts.DeleteOne(contact => contact.Id == contactIn.Id);

        public void Remove(string id) => 
            _contacts.DeleteOne(contact => contact.Id == id);
    }
}