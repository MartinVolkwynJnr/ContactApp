using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ContactListApi.Models
{
    public class ContactInfo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("ContactName")]
        public string ContactName { get; set; }

        [BsonElement("Surname")]
        public string Surname { get; set; }

        [BsonElement("Cell Number")]
        public string Cell { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; }
    }
}