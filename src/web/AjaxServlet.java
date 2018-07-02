package web;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import gifUtil.DrawImage;
/**
 * Servlet implementation class AjaxServlet
 */
@WebServlet("/AjaxServlet")
public class AjaxServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AjaxServlet() {
        super();
        // TODO Auto-generated constructor stub
    }
    public static List<File> getFiles(String realpath, List<File> files) {
    	 
        File realFile = new File(realpath);
        if (realFile.isDirectory()) {
            File[] subfiles = realFile.listFiles();
            for (File file : subfiles) {
                if (file.isDirectory()) {
                    getFiles(file.getAbsolutePath(), files);
                } else {
                    files.add(file);
                }
            }
        }
        return files;
    }
    public static List<File> getFileSort(String path) {
    	 
        List<File> list = getFiles(path, new ArrayList<File>());
 
        if (list != null && list.size() > 0) {
 
            Collections.sort(list, new Comparator<File>() {
                public int compare(File file, File newFile) {
                    if (file.lastModified() < newFile.lastModified()) {
                        return 1;
                    } else if (file.lastModified() == newFile.lastModified()) {
                        return 0;
                    } else {
                        return -1;
                    }
 
                }
            });
 
        }

        return list;
    }
    
    public static void deleteFiles(String path) {
    	List<File> flist =  getFileSort(path);
    	int i = 0;
    	for (File file : flist) {
			if(i>1) {
				file.delete();
			}
			i++;
		}
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		System.out.println("=====================");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//doGet(request, response);
		String cValue=request.getParameter("cValue");//获取ajax传过来的值
		String fileName=request.getParameter("fileName")+".gif";//获取ajax传过来的值
		String x_w = request.getParameter("x_w");
		String x_h = request.getParameter("x_h");
		int w = 100;
		int h = 80;
		
		try {
			w = Integer.valueOf(x_w);
			h = Integer.valueOf(x_h);
		} catch (Exception e) {
			// TODO: handle exception
			w = 100;
			h = 80;
		}
		if(w > 500 || h > 300 || w <0 ||h<0) {
			w = 100;
			h = 80;
		}
		
		if(cValue.length()>60) {
			cValue.substring(0, 60);
		}
		String path = request.getSession().getServletContext().getRealPath("")+File.separator+"gif";
		
		File file = new File(path);
		if(!file.isDirectory()) {
			file.mkdirs();
		}else {
			
		}
		boolean error = false;
		try {
			//deleteFiles(path);
			DrawImage.Draw(cValue,path,fileName,w,h);
		} catch (Exception e) {
			error = true;
		}
		System.out.println("path :"+path+"  fileName :"+fileName);
		if(error) {
			response.setCharacterEncoding("utf-8");
			System.out.println(" 请求生成 " + cValue +"  error");
			PrintWriter write=response.getWriter();
			write.println("error");
			write.flush();
		}else {
			response.setCharacterEncoding("utf-8");
			System.out.println(" 请求生成 " + cValue);
			PrintWriter write=response.getWriter();
			write.println("./gif/"+fileName);
			write.flush();
		}
		
	}

}
