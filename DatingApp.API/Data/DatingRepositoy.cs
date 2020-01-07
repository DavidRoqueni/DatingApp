using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DatingRepositoy : IDatingRepository
    {
        private readonly DataContext ctx;
        public DatingRepositoy(DataContext ctx)
        {
            this.ctx = ctx;

        }
        public void Add<T>(T entity) where T : class
        {
            ctx.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            ctx.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            return await ctx.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await ctx.Users.Include(p => p.Photos).ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await ctx.SaveChangesAsync() > 0;
        }
    }
}