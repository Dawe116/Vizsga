using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace FoodBackEnd.Models;

public partial class Menu
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public byte[] Picture { get; set; } = null!;

    public int RestaurantId { get; set; }
    [JsonIgnore]
    public virtual Restaurant Restaurant { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Userorder> Userorders { get; set; } = new List<Userorder>();
}
