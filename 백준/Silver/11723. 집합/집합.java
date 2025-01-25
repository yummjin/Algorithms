import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        
        int n = Integer.parseInt(br.readLine());
        int S = 0;
        
        for (int i = 0; i < n; i++) {
            String[] cmd = br.readLine().split(" ");
            
            if (cmd.length == 1) {
                if (cmd[0].equals("all")) S = (1 << 20) - 1;
                else if (cmd[0].equals("empty")) S = 0;
            } else {
                int x = Integer.parseInt(cmd[1]);
                switch (cmd[0]) {
                    case "add":
                        S |= (1 << (x - 1));
                        break;
                    case "remove":
                        S &= ~(1 << (x - 1));
                        break;
                    case "check":
                        bw.write((S & (1 << (x - 1))) != 0 ? "1\n" : "0\n");
                        break;
                    case "toggle":
                        S ^= (1 << (x - 1));
                        break;
                }
            }
        }
        
        bw.flush();
        bw.close();
        br.close();
    }
}