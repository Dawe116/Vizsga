using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace FoodBackEnd.Models;

public partial class Permission
{
    public int Id { get; set; }

    public int Szint { get; set; }

    public string Név { get; set; } = null!;

    public string Leírás { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
