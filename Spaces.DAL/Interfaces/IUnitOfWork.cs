using System.Threading.Tasks;

namespace Spaces.DAL.Interfaces;

public interface IUnitOfWork
{
    Task<int> Complete();
}