

namespace PackageTracking.Data
{
    public class Package
    {
        public int Id { get; set; }
        public string TrackingNumber { get; set; } = Guid.NewGuid().ToString("N").Substring(0, 8).ToUpper();
        public required string SenderName { get; set; }
        public required string SenderAddress { get; set; }
        public required string SenderPhone { get; set; }
        public required string RecipientName { get; set; }
        public required string RecipientAddress { get; set; }
        public required string RecipientPhone { get; set; }
        public string Status { get; set; } = "Created";

        public List<PackageStatusHistory> PackageStatusHistory { get; set; } = new();


    }
}