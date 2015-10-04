
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Writer;
import java.sql.Timestamp;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class set
 */
@WebServlet("/set")
public class set extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public set() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		// TODO Auto-generated method stub
		PrintWriter out = response.getWriter();

		String fileName = request.getParameter("fileName");
		String userId = request.getParameter("userId");
		String eventType = request.getParameter("eventType");
		String eventValue = request.getParameter("eventValue");
		try {
			Writer output = null;
			File file = new File("/Users/jgurram/Documents/" + fileName);
			output = new BufferedWriter(new FileWriter(file, true));

			java.util.Date date = new java.util.Date();
			Timestamp timeVal = new Timestamp(date.getTime());

			output.write(timeVal + ",");
			output.write(userId + ",");
			output.write(eventType + ",");
			output.write(eventValue + ",\n");
			output.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		out.println("Done");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
