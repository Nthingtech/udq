package data;

import io.quarkiverse.roq.data.runtime.annotations.DataMapping;

import java.util.List;

@DataMapping(value = "projects", type = DataMapping.Type.ARRAY_FILE)
public record Projects(List<Project> list) {

    public record Project(String image, String tag, String title,
                          String text, String url) {}
}
