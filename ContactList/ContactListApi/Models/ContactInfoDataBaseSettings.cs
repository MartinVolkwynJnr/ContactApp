namespace ContactListApi.Models
{
    public class ContactInfoDataBaseSettings : IContactInfoDataBaseSettings
    {
        public string ContactInfoCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IContactInfoDataBaseSettings
    {
        string ContactInfoCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}