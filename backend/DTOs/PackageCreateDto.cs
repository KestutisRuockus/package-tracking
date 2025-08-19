namespace PackageTracking.DTOs
{
    public class PackageCreateDto
    {
        public required string SenderName { get; set; }
        public required string SenderAddress { get; set; }
        public required string SenderPhone { get; set; }
        public required string RecipientName { get; set; }
        public required string RecipientAddress { get; set; }
        public required string RecipientPhone { get; set; }
    }
}
