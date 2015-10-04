
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Servlet implementation class get
 */
@WebServlet("/get")
public class get extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public get() {
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
		PrintWriter out = response.getWriter();
		String fileName = request.getParameter("fileName");
		JSONArray resultArray = new JSONArray();
		String userId = request.getParameter("userId");
		for (String line : Files.readAllLines(Paths
				.get("/Users/jgurram/Documents/" + fileName))) {
			String[] vals = line.split(",");

			JSONObject result = new JSONObject();
			try {
				if (vals[1].equalsIgnoreCase(userId)) {
					result.put("timeStamp", vals[0]);
					result.put("userId", vals[1]);
					result.put("eventType", vals[2]);
					result.put("eventValue", vals[3]);
					resultArray.put(result);
				}

			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		JSONArray resultReverseArray = new JSONArray();

		for (int i = resultArray.length(); i > -1; i--) {
			try {
				resultReverseArray.put(resultArray.getJSONObject(i));
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}

		// out.println("RESERVER\n");

		out.println(resultReverseArray);

		// out.println("REGULAR\n");

		// out.println(resultArray);
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
