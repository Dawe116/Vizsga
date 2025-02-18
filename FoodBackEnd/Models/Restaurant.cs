using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace FoodBackEnd.Models;

public partial class Restaurant
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Category { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Menu> Menus { get; set; } = new List<Menu>();
}
