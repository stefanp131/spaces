using System.Threading.Tasks;
using Spaces.DAL.Interfaces;

namespace Spaces.DAL.Data;

public class UnitOfWork : IUnitOfWork
{
    private readonly SpacesContext _context;

    public UnitOfWork(SpacesContext context)
    {
        _context = context;
    }
    
    public async Task<int> Complete()
    {
        return await _context.SaveChangesAsync();
    }
}