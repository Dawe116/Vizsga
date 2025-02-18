using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace FoodBackEnd.Models;

public partial class County
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();
}
