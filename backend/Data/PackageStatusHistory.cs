namespace PackageTracking.Data
{
    public class PackageStatusHistory
    {
        public int Id { get; set; }
        public string Status { get; set; } = "Created";
        public DateTime Timestamp { get; set; }
    }
}
