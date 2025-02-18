using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace FoodBackEnd.Models;

public partial class Userorder
{
    public int Id { get; set; }

    public int OrdersId { get; set; }

    public int MenuId { get; set; }
    [JsonIgnore]
    public virtual Menu Menu { get; set; } = null!;
    [JsonIgnore]
    public virtual Order Orders { get; set; } = null!;
}
