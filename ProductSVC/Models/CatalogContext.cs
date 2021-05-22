using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace ShopBridge.Models
{
    public class CatalogContext : DbContext
    {
        public DbSet<CatalogItems> catalogItems { get; set; }
    }
}