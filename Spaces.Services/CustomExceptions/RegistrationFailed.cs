using System;

namespace Spaces.Services.CustomExceptions;

public class RegistrationFailed : Exception
{
    public RegistrationFailed()
    {
        
    }

    public RegistrationFailed(string message) : base(message)
    {
        
    }
}