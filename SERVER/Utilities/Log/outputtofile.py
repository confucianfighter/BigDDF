import time
i=0
while True:
    lines = []
    with open("./file.txt", 'r') as file_in:
        lines = file_in.readlines()
   
    with open("./file.txt", 'w') as f_out:
        if len(lines) > 10:
            """[1:] Strips off the first line"""  
            lines = lines[1:]
        ###
        lines.append(f'Number is now {i} \n')
        f_out.writelines(lines)
    i+=1
    time.sleep(.25)
    ###
###

