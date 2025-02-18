using System;
using System.Collections.Generic;

namespace FoodifyWPF.Models;

public partial class Address
{
    public int Id { get; set; }

    public int CountyId { get; set; }

    public int PostalCode { get; set; }

    public string City { get; set; } = null!;

    public string Street { get; set; } = null!;

    public string HouseNumber { get; set; } = null!;

    public int? Floor { get; set; }

    public int? Door { get; set; }

    public int UserId { get; set; }

    public virtual County County { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
