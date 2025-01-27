using System;
using System.Collections.Generic;

namespace GrabNEat.Models;

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
}
