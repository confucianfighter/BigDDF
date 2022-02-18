import time

def time_this_function(f):
    def wrapper(*args, **kwargs):
        """time in seconds since the epoch!"""
        start = time.time()
        rv = f(*args,**kwargs)
        total = time.time() - start
        print(f'Function {f} took {total} seconds.')
        return rv
    ##<-wrapper
    return wrapper
##<-time_this_function


