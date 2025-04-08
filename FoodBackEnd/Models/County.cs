using System;
using System.Collections.Generic;

namespace FoodBackEnd.Models;

public partial class County
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();
}
