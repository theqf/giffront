package gifUtil;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import jpegUtil.JpegUtil;

public class DrawImage {
	
	public static void Draw(String strs ,String path,String name,int w,int h){
		File fil = new File(path);
		if(!fil.exists()){
			fil.mkdirs();
		}
		JpegUtil create = new JpegUtil();
		int nnn = create.createFlash(strs, path, w, h);	
		BufferedImage[] srcs = new BufferedImage[nnn];
		try {
			AnimatedGifEncoder e = new AnimatedGifEncoder();
			e.setRepeat(0);
			e.start(path+File.separator+name);
			e.setDelay(300);
			for(int i =0;i<nnn;i++){
				srcs[i] = ImageIO.read(new File(path+File.separator+i+".jpg"));
				e.addFrame(srcs[i]);
				e.setDelay(100);
			}
			e.finish();
			for (int i = 0; i < nnn; i++) {
				File file = new File(path+File.separator+i+".jpg");
				file.delete();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public static void main(String[] args) throws Exception {
		String path="d:/123";
		Draw("ÄãºÃ",path,"abc.gif",200,80);
	}
}
